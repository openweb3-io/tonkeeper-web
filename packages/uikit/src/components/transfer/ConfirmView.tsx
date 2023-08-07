import { useMutation } from '@tanstack/react-query';
import { isTonRecipientData, RecipientData } from '@tonkeeper/core/dist/entries/send';

import React, {
    Children,
    createContext,
    FC,
    isValidElement,
    PropsWithChildren,
    useContext,
    useState
} from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../hooks/appContext';
import { formatFiatCurrency } from '../../hooks/balance';
import { useTranslation } from '../../hooks/translation';
import { TransferEstimation } from '../../hooks/blockchain/useEstimateTransfer';
import { TransferComment } from '../activity/ActivityActionDetails';
import { BackButton } from '../fields/BackButton';
import { Button } from '../fields/Button';
import { CheckmarkCircleIcon, ChevronLeftIcon, ExclamationMarkCircleIcon } from '../Icon';
import { Gap } from '../Layout';
import { ListBlock } from '../List';
import { FullHeightBlock, NotificationCancelButton, NotificationTitleBlock } from '../Notification';
import { Label2 } from '../Text';
import { ButtonBlock, ResultButton } from './common';
import { Image, ImageMock, Info, SendingTitle, Title } from './Confirm';
import { AmountListItem, RecipientListItem } from './ConfirmListItem';
import { AssetAmount } from '@tonkeeper/core/dist/entries/crypto/asset/asset-amount';
import { TON_ASSET, TRON_USDT_ASSET } from '@tonkeeper/core/dist/entries/crypto/asset/constants';
import { useAssetAmountFiatEquivalent, useAssetImage } from '../../state/asset';
import { ActionFeeDetailsUniversal } from '../activity/NotificationCommon';
import { Asset } from '@tonkeeper/core/dist/entries/crypto/asset/asset';

type MutationProps = Pick<
    ReturnType<typeof useMutation<boolean, Error>>,
    'mutateAsync' | 'isLoading' | 'error' | 'reset'
>;

type ConfirmViewContextValue = {
    recipient: RecipientData;
    assetAmount: AssetAmount;
    estimation: {
        data: TransferEstimation | undefined;
        isLoading: boolean;
        isFetching: boolean;
    };
    formState: {
        done: boolean;
        isLoading: boolean;
        error: Error | null;
    };
    onClose: () => void;
    onBack?: () => void;
};
const ConfirmViewContext = createContext<ConfirmViewContextValue>({} as ConfirmViewContextValue);
export function useConfirmViewContext() {
    return useContext(ConfirmViewContext);
}

type ConfirmViewProps<T extends Asset> = PropsWithChildren<
    {
        recipient: RecipientData;
        assetAmount: AssetAmount<T>;
        onBack?: () => void;
        onClose: (confirmed?: boolean) => void;
        fitContent?: boolean;
        estimation: {
            data: TransferEstimation<T> | undefined;
            isLoading: boolean;
            isFetching: boolean;
        };
    } & MutationProps
>;

export function ConfirmView<T extends Asset = Asset>({
    children,
    estimation,
    recipient,
    onBack,
    onClose,
    assetAmount,
    fitContent,
    ...mutation
}: ConfirmViewProps<T>) {
    const { mutateAsync, isLoading, error, reset } = mutation;

    let titleBlock = (
        <ConfirmViewTitleSlot>
            <ConfirmViewTitle />
        </ConfirmViewTitleSlot>
    );
    let heading = (
        <ConfirmViewHeadingSlot>
            <ConfirmViewHeading />
        </ConfirmViewHeadingSlot>
    );
    let details = (
        <ConfirmViewDetailsSlot>
            <ConfirmViewDetailsRecipient />
            <ConfirmViewDetailsAmount />
            <ConfirmViewDetailsFee />
            <ConfirmViewDetailsComment />
        </ConfirmViewDetailsSlot>
    );
    let buttons = (
        <ConfirmViewButtonsSlot>
            <ConfirmViewButtons />
        </ConfirmViewButtonsSlot>
    );

    Children.map(children, child => {
        if (isValidElement(child)) {
            switch (child.type) {
                case ConfirmViewTitleSlot:
                    titleBlock = child;
                    return;
                case ConfirmViewHeadingSlot:
                    heading = child;
                    return;
                case ConfirmViewDetailsSlot:
                    details = child;
                    return;
                case ConfirmViewButtonsSlot:
                    buttons = child;
                    return;
            }
        }
    });
    const [done, setDone] = useState(false);

    const { standalone } = useAppContext();

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
        e.stopPropagation();
        e.preventDefault();

        if (isLoading) return;
        try {
            reset();
            const isDone = await mutateAsync();
            if (isDone) {
                setDone(true);
                setTimeout(() => onClose(true), 2000);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ConfirmViewContext.Provider
            value={{
                recipient,
                assetAmount,
                estimation,
                formState: { done, isLoading, error },
                onClose: () => onClose(),
                onBack
            }}
        >
            <FullHeightBlock onSubmit={onSubmit} standalone={standalone} fitContent={fitContent}>
                {titleBlock}
                {heading}
                <ListBlock margin={false} fullWidth>
                    {details}
                </ListBlock>
                <Gap />

                <ButtonBlock>{buttons}</ButtonBlock>
            </FullHeightBlock>
        </ConfirmViewContext.Provider>
    );
}

const ConfirmViewHeadingStyled = styled.div`
    margin-bottom: 1rem;
`;

export const ConfirmViewTitleSlot: FC<PropsWithChildren> = ({ children }) => <>{children}</>;
export const ConfirmViewTitle: FC<PropsWithChildren> = () => {
    const { onClose, onBack } = useConfirmViewContext();
    return (
        <NotificationTitleBlock>
            {onBack ? (
                <BackButton onClick={onBack}>
                    <ChevronLeftIcon />
                </BackButton>
            ) : (
                <div />
            )}
            <NotificationCancelButton handleClose={() => onClose()} />
        </NotificationTitleBlock>
    );
};

export const ConfirmViewHeadingSlot: FC<PropsWithChildren<{ className?: string }>> = ({
    children,
    className
}) => <ConfirmViewHeadingStyled className={className}>{children}</ConfirmViewHeadingStyled>;

export const ConfirmViewHeading: FC<PropsWithChildren<{ className?: string; title?: string }>> = ({
    className,
    title
}) => {
    const { t } = useTranslation();
    const { recipient, assetAmount } = useConfirmViewContext();
    const { data: image } = useAssetImage(assetAmount.asset);

    const fallbackTitles = {
        [TON_ASSET.id]: t('txActions_signRaw_types_tonTransfer'),
        [TRON_USDT_ASSET.id]: 'USDT transfer' // TODO
    };

    title ||= isTonRecipientData(recipient)
        ? recipient.toAccount.name
        : fallbackTitles[assetAmount.asset.id] || t('txActions_signRaw_types_jettonTransfer');

    const icon = isTonRecipientData(recipient) ? recipient.toAccount.icon || image : image;
    return (
        <Info className={className}>
            {icon ? <Image full src={image} /> : <ImageMock full />}
            <SendingTitle>{t('confirm_sending_title')}</SendingTitle>
            <Title>{title}</Title>
        </Info>
    );
};

export const ConfirmViewDetailsSlot: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export const ConfirmViewDetailsRecipient: FC = () => {
    const { recipient } = useConfirmViewContext();
    return <RecipientListItem recipient={recipient} />;
};

export const ConfirmViewDetailsAmount: FC = () => {
    const { fiat } = useAppContext();
    const { assetAmount } = useConfirmViewContext();
    const { isLoading, data: fiatAmountBN } = useAssetAmountFiatEquivalent(assetAmount);

    const fiatAmount = formatFiatCurrency(fiat, fiatAmountBN || '0');

    if (isLoading) {
        // TODO loading
        return 'LOADING';
    }

    return (
        <AmountListItem
            coinAmount={assetAmount.stringAssetRelativeAmount}
            fiatAmount={fiatAmount}
        />
    );
};

export const ConfirmViewDetailsFee: FC = () => {
    const { estimation } = useConfirmViewContext();

    return (
        <ActionFeeDetailsUniversal fee={estimation.isFetching ? undefined : estimation.data?.fee} />
    );
};
export const ConfirmViewDetailsComment: FC = () => {
    const { recipient } = useConfirmViewContext();
    if (!isTonRecipientData(recipient)) {
        return null;
    }
    return <TransferComment comment={recipient.comment} />;
};

export const ConfirmViewButtonsSlot: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

const ConfirmViewButtonsContainerStyled = styled.div`
    display: flex;
    gap: 1rem;
    & > * {
        flex: 1;
    }
`;

export const ConfirmViewButtons: FC<{ withCancelButton?: boolean }> = ({ withCancelButton }) => {
    const {
        formState: { done, error, isLoading },
        estimation: { isFetching: estimationLoading },
        onClose
    } = useConfirmViewContext();
    const { t } = useTranslation();

    const isValid = !isLoading && !estimationLoading;

    if (done) {
        return (
            <ResultButton done>
                <CheckmarkCircleIcon />
                <Label2>{t('send_screen_steps_done_done_label')}</Label2>
            </ResultButton>
        );
    }

    if (error) {
        return (
            <ResultButton>
                <ExclamationMarkCircleIcon />
                <Label2>{t('send_publish_tx_error')}</Label2>
            </ResultButton>
        );
    }

    if (withCancelButton) {
        return (
            <ConfirmViewButtonsContainerStyled>
                <Button size="large" secondary onClick={onClose}>
                    {t('cancel')}
                </Button>
                <Button size="large" primary type="submit" disabled={!isValid} loading={isLoading}>
                    {t('confirm')}
                </Button>
            </ConfirmViewButtonsContainerStyled>
        );
    }

    return (
        <Button
            fullWidth
            size="large"
            primary
            type="submit"
            disabled={!isValid}
            loading={isLoading}
        >
            {t('confirm_sending_submit')}
        </Button>
    );
};
