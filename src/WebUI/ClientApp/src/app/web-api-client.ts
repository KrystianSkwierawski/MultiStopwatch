/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.10.6.0 (NJsonSchema v10.3.8.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IProjectItemClient {
    get(): Observable<ProjectsVm>;
    create(command: CreateProjectItemCommand): Observable<FileResponse>;
    likeOrDislike(command: LikeOrDislikeProjectItemCommand): Observable<FileResponse>;
}

@Injectable({
    providedIn: 'root'
})
export class ProjectItemClient implements IProjectItemClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    get(): Observable<ProjectsVm> {
        let url_ = this.baseUrl + "/api/ProjectItem";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<ProjectsVm>><any>_observableThrow(e);
                }
            } else
                return <Observable<ProjectsVm>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<ProjectsVm> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = ProjectsVm.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ProjectsVm>(<any>null);
    }

    create(command: CreateProjectItemCommand): Observable<FileResponse> {
        let url_ = this.baseUrl + "/api/ProjectItem";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<FileResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<FileResponse>><any>_observableThrow(response_);
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<FileResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return _observableOf({ fileName: fileName, data: <any>responseBlob, status: status, headers: _headers });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<FileResponse>(<any>null);
    }

    likeOrDislike(command: LikeOrDislikeProjectItemCommand): Observable<FileResponse> {
        let url_ = this.baseUrl + "/api/ProjectItem";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            })
        };

        return this.http.request("patch", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processLikeOrDislike(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processLikeOrDislike(<any>response_);
                } catch (e) {
                    return <Observable<FileResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<FileResponse>><any>_observableThrow(response_);
        }));
    }

    protected processLikeOrDislike(response: HttpResponseBase): Observable<FileResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return _observableOf({ fileName: fileName, data: <any>responseBlob, status: status, headers: _headers });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<FileResponse>(<any>null);
    }
}

export class ProjectsVm implements IProjectsVm {
    projects?: ProjectItemDto[] | undefined;
    favoriteProjects?: FavoriteProjectItemDto[] | undefined;

    constructor(data?: IProjectsVm) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["projects"])) {
                this.projects = [] as any;
                for (let item of _data["projects"])
                    this.projects!.push(ProjectItemDto.fromJS(item));
            }
            if (Array.isArray(_data["favoriteProjects"])) {
                this.favoriteProjects = [] as any;
                for (let item of _data["favoriteProjects"])
                    this.favoriteProjects!.push(FavoriteProjectItemDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProjectsVm {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectsVm();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.projects)) {
            data["projects"] = [];
            for (let item of this.projects)
                data["projects"].push(item.toJSON());
        }
        if (Array.isArray(this.favoriteProjects)) {
            data["favoriteProjects"] = [];
            for (let item of this.favoriteProjects)
                data["favoriteProjects"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IProjectsVm {
    projects?: ProjectItemDto[] | undefined;
    favoriteProjects?: FavoriteProjectItemDto[] | undefined;
}

export class ProjectItemDto implements IProjectItemDto {
    id?: number;
    title?: string | undefined;
    isFavorite?: boolean;
    time?: string | undefined;

    constructor(data?: IProjectItemDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.title = _data["title"];
            this.isFavorite = _data["isFavorite"];
            this.time = _data["time"];
        }
    }

    static fromJS(data: any): ProjectItemDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectItemDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["isFavorite"] = this.isFavorite;
        data["time"] = this.time;
        return data; 
    }
}

export interface IProjectItemDto {
    id?: number;
    title?: string | undefined;
    isFavorite?: boolean;
    time?: string | undefined;
}

export class FavoriteProjectItemDto implements IFavoriteProjectItemDto {
    _title?: string | undefined;
    id?: number;
    title?: string | undefined;
    time?: string | undefined;

    constructor(data?: IFavoriteProjectItemDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this._title = _data["_title"];
            this.id = _data["id"];
            this.title = _data["title"];
            this.time = _data["time"];
        }
    }

    static fromJS(data: any): FavoriteProjectItemDto {
        data = typeof data === 'object' ? data : {};
        let result = new FavoriteProjectItemDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["_title"] = this._title;
        data["id"] = this.id;
        data["title"] = this.title;
        data["time"] = this.time;
        return data; 
    }
}

export interface IFavoriteProjectItemDto {
    _title?: string | undefined;
    id?: number;
    title?: string | undefined;
    time?: string | undefined;
}

export class CreateProjectItemCommand implements ICreateProjectItemCommand {
    title?: string | undefined;

    constructor(data?: ICreateProjectItemCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.title = _data["title"];
        }
    }

    static fromJS(data: any): CreateProjectItemCommand {
        data = typeof data === 'object' ? data : {};
        let result = new CreateProjectItemCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["title"] = this.title;
        return data; 
    }
}

export interface ICreateProjectItemCommand {
    title?: string | undefined;
}

export class LikeOrDislikeProjectItemCommand implements ILikeOrDislikeProjectItemCommand {
    id?: number;

    constructor(data?: ILikeOrDislikeProjectItemCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
        }
    }

    static fromJS(data: any): LikeOrDislikeProjectItemCommand {
        data = typeof data === 'object' ? data : {};
        let result = new LikeOrDislikeProjectItemCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        return data; 
    }
}

export interface ILikeOrDislikeProjectItemCommand {
    id?: number;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}

export class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}