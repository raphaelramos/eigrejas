import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavExtrasService {

    extras: any;
    story: any;

    constructor() { }

    public setExtras(data){
        this.extras = data;
    }

    public getExtras(){
        return this.extras;
    }

    public clearExtras() {
        this.extras = null;
    }

    public setStory(data){
        this.story = data;
    }

    public getStory(){
        return this.story;
    }
}