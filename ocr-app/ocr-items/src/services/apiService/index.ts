import { IList } from "../../store/form/constants";
import { createFormData } from '../dataTransformService';
import { storeItemsFromList } from "../editItemsService";



export const handleSubmit = (form: FormData) => (event: React.FormEvent<HTMLInputElement | HTMLFormElement>) => {
    event.preventDefault();
    console.log("Store is: ", form);
}

export async function postImageFile(url: string, data: File | Blob) {

    const formData: FormData = createFormData(data);
    let status;
    let response;

    try {
        ({ status, response } = await post<IList>(url, formData));
    } catch (error) {
        const message = [error.code];
        console.log("error", message, "status", status);
        return;
    }

    // check for success response
    if (status === 200 || status === 201) {
        // proccess reponse 
        console.log("Proccess reponse", status, response);
        storeItemsFromList(response);
        return;
    } // unexpected status
    else {
        console.log("Wrong respoinse status", status);
        return;
    }

}

/**
 *  Post data to url
 */

function post<T>(url: string, data: FormData): Promise<IApiServiceResponse<T>> {
    const body = data;

    console.log('Sending post request to ' + url, 'body: ' + body);

    // Don't need to specify header for form
    const request = {
        method: 'POST',
        body
    }

    console.log("request: ", request)

    const response: Promise<Response> = fetch(url, request);
    return processResponse(response, true);
}

/**
 *  Helpers for  repsonse handling
 */
class ApiServiceError extends Error {
    constructor(code: string, status?: string | number) {
        console.log("Api Service Error: ", code, status);
        super();
    }
}

interface IApiServiceResponse<T> {
    status: number;
    response: T;
}

async function processResponse<T>(
    responsePromise: Promise<Response>,
    responseHasBody: boolean
): Promise<IApiServiceResponse<T>> {

    let response: Response;
    try {
        response = await responsePromise;
    } catch (error) {
        throw new ApiServiceError('000', "Network error");
    }

    console.log('Api response received', response);

    if (!responseHasBody && response.ok) {
        const apiResponse: IApiServiceResponse<T> = {
            status: response.status,
            response: {} as T
        };

        return apiResponse;
    }

    let json: Response;

    // try and parse the response
    try {
        json = await response.json();
    } catch (error) {
        throw new ApiServiceError('001', response.status);
    }

    if (response.ok) {
        console.log('Response Ok');
        const apiResponse: IApiServiceResponse<T> = {
            status: response.status,
            response: (json as any) as T
        };

        return apiResponse;
    }

    throw new ApiServiceError(((json as any) as IApiServiceResponse<string>).status + '' || '001', response.status);
}



