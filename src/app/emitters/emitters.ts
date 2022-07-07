
import { EventEmitter } from "@angular/core";

export class Emitters{

    static authEmitter=new EventEmitter<boolean>();
    static spinnerEmitter=new EventEmitter<boolean>();
    static navEmitter=new EventEmitter<boolean>();

}
