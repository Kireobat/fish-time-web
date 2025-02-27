/* tslint:disable */
/* eslint-disable */
/**
 * OAuth API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CreateRoomDto
 */
export interface CreateRoomDto {
    /**
     * 
     * @type {string}
     * @memberof CreateRoomDto
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof CreateRoomDto
     */
    capacity?: number;
    /**
     * 
     * @type {string}
     * @memberof CreateRoomDto
     */
    address?: string;
    /**
     * 
     * @type {boolean}
     * @memberof CreateRoomDto
     */
    active?: boolean;
}

/**
 * Check if a given object implements the CreateRoomDto interface.
 */
export function instanceOfCreateRoomDto(value: object): value is CreateRoomDto {
    return true;
}

export function CreateRoomDtoFromJSON(json: any): CreateRoomDto {
    return CreateRoomDtoFromJSONTyped(json, false);
}

export function CreateRoomDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateRoomDto {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'] == null ? undefined : json['name'],
        'capacity': json['capacity'] == null ? undefined : json['capacity'],
        'address': json['address'] == null ? undefined : json['address'],
        'active': json['active'] == null ? undefined : json['active'],
    };
}

export function CreateRoomDtoToJSON(json: any): CreateRoomDto {
    return CreateRoomDtoToJSONTyped(json, false);
}

export function CreateRoomDtoToJSONTyped(value?: CreateRoomDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'capacity': value['capacity'],
        'address': value['address'],
        'active': value['active'],
    };
}

