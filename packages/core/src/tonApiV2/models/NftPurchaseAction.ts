/* tslint:disable */
/* eslint-disable */
/**
 * REST api to TON blockchain explorer
 * Provide access to indexed TON blockchain
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: support@tonkeeper.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { Price } from './Price';
import {
    PriceFromJSON,
    PriceFromJSONTyped,
    PriceToJSON,
} from './Price';
import type { NftItem } from './NftItem';
import {
    NftItemFromJSON,
    NftItemFromJSONTyped,
    NftItemToJSON,
} from './NftItem';
import type { AccountAddress } from './AccountAddress';
import {
    AccountAddressFromJSON,
    AccountAddressFromJSONTyped,
    AccountAddressToJSON,
} from './AccountAddress';

/**
 * 
 * @export
 * @interface NftPurchaseAction
 */
export interface NftPurchaseAction {
    /**
     * 
     * @type {string}
     * @memberof NftPurchaseAction
     */
    auctionType: NftPurchaseActionAuctionTypeEnum;
    /**
     * 
     * @type {Price}
     * @memberof NftPurchaseAction
     */
    amount: Price;
    /**
     * 
     * @type {NftItem}
     * @memberof NftPurchaseAction
     */
    nft: NftItem;
    /**
     * 
     * @type {AccountAddress}
     * @memberof NftPurchaseAction
     */
    seller: AccountAddress;
    /**
     * 
     * @type {AccountAddress}
     * @memberof NftPurchaseAction
     */
    buyer: AccountAddress;
}


/**
 * @export
 */
export const NftPurchaseActionAuctionTypeEnum = {
    DnsTon: 'DNS.ton',
    DnsTg: 'DNS.tg',
    NumberTg: 'NUMBER.tg',
    Getgems: 'getgems'
} as const;
export type NftPurchaseActionAuctionTypeEnum = typeof NftPurchaseActionAuctionTypeEnum[keyof typeof NftPurchaseActionAuctionTypeEnum];


/**
 * Check if a given object implements the NftPurchaseAction interface.
 */
export function instanceOfNftPurchaseAction(value: object): value is NftPurchaseAction {
    if (!('auctionType' in value) || value['auctionType'] === undefined) return false;
    if (!('amount' in value) || value['amount'] === undefined) return false;
    if (!('nft' in value) || value['nft'] === undefined) return false;
    if (!('seller' in value) || value['seller'] === undefined) return false;
    if (!('buyer' in value) || value['buyer'] === undefined) return false;
    return true;
}

export function NftPurchaseActionFromJSON(json: any): NftPurchaseAction {
    return NftPurchaseActionFromJSONTyped(json, false);
}

export function NftPurchaseActionFromJSONTyped(json: any, ignoreDiscriminator: boolean): NftPurchaseAction {
    if (json == null) {
        return json;
    }
    return {
        
        'auctionType': json['auction_type'],
        'amount': PriceFromJSON(json['amount']),
        'nft': NftItemFromJSON(json['nft']),
        'seller': AccountAddressFromJSON(json['seller']),
        'buyer': AccountAddressFromJSON(json['buyer']),
    };
}

export function NftPurchaseActionToJSON(value?: NftPurchaseAction | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'auction_type': value['auctionType'],
        'amount': PriceToJSON(value['amount']),
        'nft': NftItemToJSON(value['nft']),
        'seller': AccountAddressToJSON(value['seller']),
        'buyer': AccountAddressToJSON(value['buyer']),
    };
}

