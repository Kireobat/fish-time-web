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
 * @interface CreateParticipantDto
 */
export interface CreateParticipantDto {
    /**
     * 
     * @type {number}
     * @memberof CreateParticipantDto
     */
    userId?: number;
    /**
     * 
     * @type {number}
     * @memberof CreateParticipantDto
     */
    meetingId?: number;
    /**
     * 
     * @type {string}
     * @memberof CreateParticipantDto
     */
    status?: string;
}

/**
 * Check if a given object implements the CreateParticipantDto interface.
 */
export function instanceOfCreateParticipantDto(value: object): value is CreateParticipantDto {
    return true;
}

export function CreateParticipantDtoFromJSON(json: any): CreateParticipantDto {
    return CreateParticipantDtoFromJSONTyped(json, false);
}

export function CreateParticipantDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateParticipantDto {
    if (json == null) {
        return json;
    }
    return {
        
        'userId': json['userId'] == null ? undefined : json['userId'],
        'meetingId': json['meetingId'] == null ? undefined : json['meetingId'],
        'status': json['status'] == null ? undefined : json['status'],
    };
}

export function CreateParticipantDtoToJSON(json: any): CreateParticipantDto {
    return CreateParticipantDtoToJSONTyped(json, false);
}

export function CreateParticipantDtoToJSONTyped(value?: CreateParticipantDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'userId': value['userId'],
        'meetingId': value['meetingId'],
        'status': value['status'],
    };
}

