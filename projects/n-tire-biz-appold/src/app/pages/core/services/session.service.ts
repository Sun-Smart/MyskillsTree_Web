import { Injectable } from '@angular/core';

@Injectable()
/**
 * Session storage service
 * Provides methods to get, set, remove, clear session storage items.
 */

export class SessionService {
    /**
     * set session storage item
     * @param key 
     * @param value 
     */

    setItem(key: string, value: any) {
        localStorage.setItem(key, value);
    }



    private urlBase64Decode(str: string) {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                // tslint:disable-next-line:no-string-throw
                throw 'Illegal base64url string!';
        }
        return decodeURIComponent((<any>window).escape(window.atob(output)));
    }

    /**
     * get session storage item
     * @param key 
     */
    getItem(key: string): any {
        //debugger;
        var value = localStorage.getItem(key);

        return value;
    }

    setViewHtml(value: any) {
        if (value == null) value = "";

        //console.log(value)
        //this.sharedService.alert(value)
        this.setItem('viewhtml', value);
        //this.viewhtml= value;
    }
    getViewHtml(): string {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            //console.log(key);
            //console.log(value);
        }

        let viewhtml = this.getItem('viewhtml');
        if (viewhtml == null) viewhtml = "";
        if (viewhtml == undefined) viewhtml = "";
        return viewhtml;
    }
    getSession(): any {
        //debugger;
        var token = localStorage.getItem("currentUser");
        let value = "";
        if (token != null && token != undefined) {
            const parts = token.split('.');
            if (parts.length !== 3) {
                return null;
                // debugger;
                throw new Error('JWT must have 3 parts');
            }
            const decoded = this.urlBase64Decode(parts[1]);
            if (!decoded) {
                throw new Error('Cannot decode the token');
            }
            value = JSON.parse(decoded);
        }
        return value;
    }

    /**
     * remove session storage item
     * @param key
     */
    removeItem(key: string) {
        localStorage.removeItem(key);
    }

    /**
     * remove all session storage items
     */
    clear() {
        localStorage.clear();
    }

}