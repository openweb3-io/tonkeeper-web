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
import type { GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignaturesSignaturesInner } from './GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignaturesSignaturesInner';
import {
    GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignaturesSignaturesInnerFromJSON,
    GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignaturesSignaturesInnerFromJSONTyped,
    GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignaturesSignaturesInnerToJSON,
} from './GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignaturesSignaturesInner';

/**
 * 
 * @export
 * @interface GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignatures
 */
export interface GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignatures {
    /**
     * 
     * @type {number}
     * @memberof GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignatures
     */
    validatorSetHash: number;
    /**
     * 
     * @type {number}
     * @memberof GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignatures
     */
    catchainSeqno: number;
    /**
     * 
     * @type {Array<GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignaturesSignaturesInner>}
     * @memberof GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignatures
     */
    signatures: Array<GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignaturesSignaturesInner>;
}

/**
 * Check if a given object implements the GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignatures interface.
 */
export function instanceOfGetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignatures(value: object): value is GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignatures {
    if (!('validatorSetHash' in value) || value['validatorSetHash'] === undefined) return false;
    if (!('catchainSeqno' in value) || value['catchainSeqno'] === undefined) return false;
    if (!('signatures' in value) || value['signatures'] === undefined) return false;
    return true;
}

export function GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignaturesFromJSON(json: any): GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignatures {
    return GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignaturesFromJSONTyped(json, false);
}

export function GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignaturesFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignatures {
    if (json == null) {
        return json;
    }
    return {
        
        'validatorSetHash': json['validator_set_hash'],
        'catchainSeqno': json['catchain_seqno'],
        'signatures': ((json['signatures'] as Array<any>).map(GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignaturesSignaturesInnerFromJSON)),
    };
}

export function GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignaturesToJSON(value?: GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignatures | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'validator_set_hash': value['validatorSetHash'],
        'catchain_seqno': value['catchainSeqno'],
        'signatures': ((value['signatures'] as Array<any>).map(GetRawBlockProof200ResponseStepsInnerLiteServerBlockLinkForwardSignaturesSignaturesInnerToJSON)),
    };
}

