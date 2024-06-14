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
import type { ImagePreview } from './ImagePreview';
import {
    ImagePreviewFromJSON,
    ImagePreviewFromJSONTyped,
    ImagePreviewToJSON,
} from './ImagePreview';
import type { AccountAddress } from './AccountAddress';
import {
    AccountAddressFromJSON,
    AccountAddressFromJSONTyped,
    AccountAddressToJSON,
} from './AccountAddress';

/**
 * 
 * @export
 * @interface NftCollection
 */
export interface NftCollection {
    /**
     * 
     * @type {string}
     * @memberof NftCollection
     */
    address: string;
    /**
     * 
     * @type {number}
     * @memberof NftCollection
     */
    nextItemIndex: number;
    /**
     * 
     * @type {AccountAddress}
     * @memberof NftCollection
     */
    owner?: AccountAddress;
    /**
     * 
     * @type {string}
     * @memberof NftCollection
     */
    rawCollectionContent: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof NftCollection
     */
    metadata?: { [key: string]: any; };
    /**
     * 
     * @type {Array<ImagePreview>}
     * @memberof NftCollection
     */
    previews?: Array<ImagePreview>;
    /**
     * 
     * @type {Array<string>}
     * @memberof NftCollection
     */
    approvedBy: Array<NftCollectionApprovedByEnum>;
}


/**
 * @export
 */
export const NftCollectionApprovedByEnum = {
    Getgems: 'getgems',
    Tonkeeper: 'tonkeeper',
    TonDiamonds: 'ton.diamonds'
} as const;
export type NftCollectionApprovedByEnum = typeof NftCollectionApprovedByEnum[keyof typeof NftCollectionApprovedByEnum];


/**
 * Check if a given object implements the NftCollection interface.
 */
export function instanceOfNftCollection(value: object): value is NftCollection {
    if (!('address' in value) || value['address'] === undefined) return false;
    if (!('nextItemIndex' in value) || value['nextItemIndex'] === undefined) return false;
    if (!('rawCollectionContent' in value) || value['rawCollectionContent'] === undefined) return false;
    if (!('approvedBy' in value) || value['approvedBy'] === undefined) return false;
    return true;
}

export function NftCollectionFromJSON(json: any): NftCollection {
    return NftCollectionFromJSONTyped(json, false);
}

export function NftCollectionFromJSONTyped(json: any, ignoreDiscriminator: boolean): NftCollection {
    if (json == null) {
        return json;
    }
    return {
        
        'address': json['address'],
        'nextItemIndex': json['next_item_index'],
        'owner': json['owner'] == null ? undefined : AccountAddressFromJSON(json['owner']),
        'rawCollectionContent': json['raw_collection_content'],
        'metadata': json['metadata'] == null ? undefined : json['metadata'],
        'previews': json['previews'] == null ? undefined : ((json['previews'] as Array<any>).map(ImagePreviewFromJSON)),
        'approvedBy': json['approved_by'],
    };
}

export function NftCollectionToJSON(value?: NftCollection | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'address': value['address'],
        'next_item_index': value['nextItemIndex'],
        'owner': AccountAddressToJSON(value['owner']),
        'raw_collection_content': value['rawCollectionContent'],
        'metadata': value['metadata'],
        'previews': value['previews'] == null ? undefined : ((value['previews'] as Array<any>).map(ImagePreviewToJSON)),
        'approved_by': value['approvedBy'],
    };
}

