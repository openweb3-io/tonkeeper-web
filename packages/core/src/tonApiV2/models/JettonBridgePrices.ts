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
/**
 * 
 * @export
 * @interface JettonBridgePrices
 */
export interface JettonBridgePrices {
    /**
     * 
     * @type {number}
     * @memberof JettonBridgePrices
     */
    bridgeBurnFee: number;
    /**
     * 
     * @type {number}
     * @memberof JettonBridgePrices
     */
    bridgeMintFee: number;
    /**
     * 
     * @type {number}
     * @memberof JettonBridgePrices
     */
    walletMinTonsForStorage: number;
    /**
     * 
     * @type {number}
     * @memberof JettonBridgePrices
     */
    walletGasConsumption: number;
    /**
     * 
     * @type {number}
     * @memberof JettonBridgePrices
     */
    minterMinTonsForStorage: number;
    /**
     * 
     * @type {number}
     * @memberof JettonBridgePrices
     */
    discoverGasConsumption: number;
}

/**
 * Check if a given object implements the JettonBridgePrices interface.
 */
export function instanceOfJettonBridgePrices(value: object): boolean {
    if (!('bridgeBurnFee' in value)) return false;
    if (!('bridgeMintFee' in value)) return false;
    if (!('walletMinTonsForStorage' in value)) return false;
    if (!('walletGasConsumption' in value)) return false;
    if (!('minterMinTonsForStorage' in value)) return false;
    if (!('discoverGasConsumption' in value)) return false;
    return true;
}

export function JettonBridgePricesFromJSON(json: any): JettonBridgePrices {
    return JettonBridgePricesFromJSONTyped(json, false);
}

export function JettonBridgePricesFromJSONTyped(json: any, ignoreDiscriminator: boolean): JettonBridgePrices {
    if (json == null) {
        return json;
    }
    return {
        
        'bridgeBurnFee': json['bridge_burn_fee'],
        'bridgeMintFee': json['bridge_mint_fee'],
        'walletMinTonsForStorage': json['wallet_min_tons_for_storage'],
        'walletGasConsumption': json['wallet_gas_consumption'],
        'minterMinTonsForStorage': json['minter_min_tons_for_storage'],
        'discoverGasConsumption': json['discover_gas_consumption'],
    };
}

export function JettonBridgePricesToJSON(value?: JettonBridgePrices | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'bridge_burn_fee': value['bridgeBurnFee'],
        'bridge_mint_fee': value['bridgeMintFee'],
        'wallet_min_tons_for_storage': value['walletMinTonsForStorage'],
        'wallet_gas_consumption': value['walletGasConsumption'],
        'minter_min_tons_for_storage': value['minterMinTonsForStorage'],
        'discover_gas_consumption': value['discoverGasConsumption'],
    };
}
