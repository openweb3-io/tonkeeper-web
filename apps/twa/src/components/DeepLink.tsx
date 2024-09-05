import { retrieveLaunchParams } from '@tma.js/sdk';
import { ConnectItemReply, DAppManifest } from '@tonkeeper/core/dist/entries/tonConnect';
import { TonConnectParams } from '@tonkeeper/core/dist/service/tonConnect/connectionService';
import { TonConnectNotification } from '@tonkeeper/uikit/dist/components/connect/TonConnectNotification';
import {
    useGetConnectInfo,
    useResponseConnectionMutation
} from '@tonkeeper/uikit/dist/components/connect/connectHook';
import queryString from 'query-string';
import { useEffect, useState } from 'react';


function decodeTelegramUrlParameters(parameters: string): string {
    return parameters
        .replaceAll('--', '%')
        .replaceAll('__', '=')
        .replaceAll('-', '&')
        .replaceAll('%5F', '_')
        .replaceAll('%2D', '-')
        .replaceAll('%2E', '.')
}

export const DeepLinkSubscription = () => {
    const { startParam } = retrieveLaunchParams();
    const [params, setParams] = useState<TonConnectParams | null>(null);

    const { mutateAsync, reset } = useGetConnectInfo();
    const { mutateAsync: responseConnectionAsync, reset: responseReset } =
        useResponseConnectionMutation();

    const handlerClose = async (replyItems?: ConnectItemReply[], manifest?: DAppManifest) => {
        if (!params) return;
        responseReset();
        try {
            await responseConnectionAsync({ params, replyItems, manifest });
        } finally {
            setParams(null);
            // sendBackground({ king: 'reconnect' } as TonConnectMessage);
        }
    };

    useEffect(() => {
        if (!startParam) return;

        console.log('startParam: ', startParam);

        let q = startParam.replace('tonconnect-', 'startapp=');
        const query1 = queryString.parse(q);
        let startapp = query1["startapp"] as string;

        console.log('startapp1: ', startapp);

        startapp = decodeTelegramUrlParameters(startapp);
        console.log('startapp2: ', startapp);

        const query2 = queryString.parse(startapp)
        console.log('query2: ', query2)

        const url = "about:blank?" + startapp;
        console.log('url: ', url)
        const { query } = queryString.parseUrl(url)
        console.log('query3: ', query);

        const fn = async function () {
            reset();
            setParams(await mutateAsync(url));
        }
        fn();
    }, [startParam]);

    return (
        <TonConnectNotification
            origin={undefined}
            params={params?.request ?? null}
            handleClose={handlerClose}
        />
    );
};
