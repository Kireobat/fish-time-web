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
 * @interface UserDto
 */
export interface UserDto {
    /**
     * 
     * @type {number}
     * @memberof UserDto
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    username?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    email?: string;
    /**
     * 
     * @type {Date}
     * @memberof UserDto
     */
    createdTime?: Date;
}

/**
 * Check if a given object implements the UserDto interface.
 */
export function instanceOfUserDto(value: object): value is UserDto {
    return true;
}

export function UserDtoFromJSON(json: any): UserDto {
    return UserDtoFromJSONTyped(json, false);
}

export function UserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserDto {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'username': json['username'] == null ? undefined : json['username'],
        'email': json['email'] == null ? undefined : json['email'],
        'createdTime': json['createdTime'] == null ? undefined : (new Date(json['createdTime'])),
    };
}

export function UserDtoToJSON(json: any): UserDto {
    return UserDtoToJSONTyped(json, false);
}

export function UserDtoToJSONTyped(value?: UserDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'username': value['username'],
        'email': value['email'],
        'createdTime': value['createdTime'] == null ? undefined : ((value['createdTime']).toISOString()),
    };
}

