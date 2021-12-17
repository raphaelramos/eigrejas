import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Platform, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { App, AppInfo } from '@capacitor/app';
import { AppLauncher } from '@capacitor/app-launcher';
import { Browser } from '@capacitor/browser';
import { Clipboard } from '@capacitor/clipboard';
import { Device, DeviceInfo } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { Share } from '@capacitor/share';
import { Storage } from '@capacitor/storage';
import { Toast } from '@capacitor/toast';
import { KeepAwake } from '@capacitor-community/keep-awake';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { User } from '../models/user';
import { info } from '../models/infoChurch';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiProvider {

    public BASE_URL = environment.base;
    public package = 'com.r2company.eigrejas';
    public idApple = 'id1581096923';
    public GOOGLE_API = 'AIzaSyCSd9JxhulGxu7djQv7C2-p2nO-lzVV_bY';
    private database: SQLiteObject;
    public appInfo: AppInfo;
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public newVersion: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public logo: BehaviorSubject<string> = new BehaviorSubject(null);
    public church: BehaviorSubject<string> = new BehaviorSubject(null);
    public names: BehaviorSubject<any> = new BehaviorSubject({});
    public infoChurch: BehaviorSubject<info> = new BehaviorSubject(null);
    public menu = [];
    public device: DeviceInfo;
    public fontSize: number = 20;
    public language: string;
    public networkStatus = true;
    public news = new BehaviorSubject([]);
    public token = null;
    public userData: BehaviorSubject<User> = new BehaviorSubject(null);

    constructor(
        public http: HttpClient,
        private platform: Platform,
        private router: Router,
        public alertController: AlertController,
        private sqlite: SQLite,
        private sqlitePorter: SQLitePorter,
        private callNumber: CallNumber
    ){
        this.listenToInternet();

        this.platform.ready().then(() => {
            this.infoDevice();
            this.settings();
            if (this.platform.is("capacitor")) {
                this.infoApp();
                //create database
                this.sqlite.create({
                    name: 'news.db',
                    location: 'default'
                }).then((db: SQLiteObject) => {
                    this.database = db;
                    this.seedDatabase();
                });
            }
        });
    }

    listenToInternet() {
        Network.addListener('networkStatusChange', (status) => {
            this.networkStatus = status.connected;
        });
        console.log('network', this.networkStatus);
    }

    whatsapp(number) {
        this.infoChurch.subscribe(res => {
            const phone_code = res.phone_code;
            if (this.platform.is("capacitor")) {
                return window.open(`whatsapp://send?phone=${phone_code}${number}`, '_system');
            };
            this.openUrl(`https://api.whatsapp.com/send?phone=${phone_code}${number}`);
        });
    }

    whatsappSupport() {
        const number = '5534984258410';
        if (this.platform.is("capacitor")) {
            return window.open(`whatsapp://send?phone=${number}`, '_system');
        };
        this.openUrl(`https://api.whatsapp.com/send?phone=${number}`);
    }

    call(number: string) {
        if (this.platform.is("capacitor")) {
            return this.callNumber.callNumber(number, false);
        }

        this.openUrl(`tel:${number}`);
    }

    isOnline() {
        return this.networkStatus;
    }

    infoDevice = async () => {
        this.device = await Device.getInfo();
    }

    infoApp = async () => {
        const info = await App.getInfo();
        this.appInfo = info;
    }

    getData(url): any {
        return this.http.get(url);
    }

    settings() {
        this.getSettingChurch();
        this.getSettingUser();
        this.getSettingToken();
        this.getSettingFont();
    }

    getSettingChurch = async () => {
        const { value } = await Storage.get({ key: 'church' });
        if (value) {
            this.church.next(value);
            this.churchSettings();
        }
    }

    getSettingUser = async () => {
        const { value } =  await Storage.get({ key: 'user' });
        if (value) {
            this.userData.next(JSON.parse(value));
        }
    }

    getSettingToken = async () => {
        const { value } =  await Storage.get({ key: 'token' });
        if (value) {
            this.token = JSON.parse(value);
        }
    }

    getSettingFont = async () => {
        const { value } = await Storage.get({ key: 'fontSize' });
        if (value) {
            this.fontSize = +value;
        }
    }

    updateFont = async () => {
        await Storage.set({
            key: 'fontSize',
            value: String(this.fontSize),
        });
    }

    storeChurch = async (id) => {
        this.church.next(id);
        await Storage.set({
            key: 'church',
            value: id,
        });
    }

    updateChurch = async (id) => {
        this.church.next(id);
        await Storage.set({
            key: 'church',
            value: id,
        });
        await this.churchSettings();
    }

    removeChurch = async () => {
        this.infoChurch.next(null);
        this.logo.next(null);
        this.userData.next(null);
        await Storage.remove({ key: 'church' });
    }

    openUrl = async (url) => {
        await Browser.open({ url: url });
    }

    openUrlApp = async (url) => {
        await AppLauncher.openUrl({ url: url });
    }

    shareText = async (text) => {
        await Share.share({
            dialogTitle: 'Compartilhar',
            text: text
        });
    }

    shareUrl = async (url) => {
        await Share.share({
            dialogTitle: 'Compartilhar',
            url: url
        });
    }

    clipboard = async (text) => {
        await Clipboard.write({
            string: text
        });
        this.toast('Copiado');
    }

    toast = async (text) => {
        await Toast.show({
            text: text
        });
    }

    keepAwake = async () => {
        await KeepAwake.keepAwake();
    };
      
    allowSleep = async () => {
        await KeepAwake.allowSleep();
    };

    isNewerVersion(newVer) {
        const oldVer = String(this.appInfo.version);

        const oldParts = oldVer.split('.');
        const newParts = newVer.split('.');

        for (var i = 0; i < newParts.length; i++) {
          const a = ~~newParts[i] // parse int
          const b = ~~oldParts[i] // parse int
          if (a > b) return true
          if (a < b) return false
        }
        return false
    }

    churchSettings = async () => {
        this.getChurchSettings().subscribe(res => {
            const info = {
                id: res.id,
                logo: res.details.logo,
                url: res.details.url,
                menu: res.app_menu.original.links,
                allow_register_status: res.details.allow_register_status,
                allow_member_register_status: res.details.allow_member_register_status,
                group_name: res.details.group_name,
                groups_name: res.details.groups_name,
                phone_code: res.details.phone_code,
                status: res.status.original.details
            };
            this.infoChurch.next(info);
            // add logo
            this.logo.next(res.details.logo);
            // add groups name
            this.names.next({group: res.details.group_name, groups: res.details.groups_name});
            // add menu
            this.menu = res.app_menu.original.links;
            // check church enable
            this.churchEnable(res.status.original.details);
            // check new version app
            if (this.platform.is("capacitor")) {
                this.newVersion.next(this.isNewerVersion(res.last_version));
            }
        }, error => {});
    }

    getChurchSettings(): any {
        return this.http.get( `${this.BASE_URL}/api/v1/website/settings`);
    }

    churchEnable(status) {
        if(!(!!status.status)) {
            const close_msg = status.site + ': '
            + status.close_msg;
            const navData: NavigationExtras = {
                queryParams : {
                    close_msg: close_msg
                }
            };
            this.router.navigate(['/church'], navData);
        }
    }

    seedDatabase() {
        let sql = 'create table IF NOT EXISTS `news` ([id] INTEGER PRIMARY KEY, [link] TEXT, [title] TEXT, [details] TEXT, [date] DATETIME, [href] TEXT, [Joined_categories] INTEGER, [section_id] INTEGER)';
        this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
            console.log('create db');
            this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    }

    saveNews(news, section_id) {
        let data = [news.id, news.title, news.details, news.date, 0, section_id];
        this.database.executeSql('REPLACE INTO news (id, title, details, date, href, Joined_categories, section_id) VALUES (?, ?, ?, ?, ?, ?, ?)', data).then(data => {})
        .catch(e => console.error('erro insert', e));
    }

    savedNews(section_id): any {
        let query = `SELECT id, title, details, date, href, Joined_categories FROM news WHERE section_id = ?`;
        return this.database.executeSql(query, [section_id])
        .then((data) => 
        {
            let news: any[] = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    news.push({
                        id: data.rows.item(i).id,
                        title: data.rows.item(i).title,
                        details: data.rows.item(i).details,
                        date: data.rows.item(i).date,
                        href: data.rows.item(i).href,
                        Joined_categories: { id: data.rows.item(i).Joined_categories }
                    });
                }
                return news;
            } else {
                return [];
            }
        })
        .catch(e => console.log('erro sql', e));
    }

    savedNew(id) {
        let query = `SELECT id, title, details, date, href FROM news WHERE id = ?`;
        return this.database.executeSql(query, [id])
        .then((data) => 
        {
            let news: any[] = [];
            console.log('data', data)
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    news.push({
                        id: data.rows.item(i).id,
                        title: data.rows.item(i).title,
                        details: data.rows.item(i).details,
                        date: data.rows.item(i).date,
                        href: data.rows.item(i).href
                    });
                }
                return news;
            } else {
                return [];
            }
        })
        .catch(e => console.log('erro sql', e));
    }

    clearNews() {
        let query = 'DROP TABLE news;';
        return this.database.executeSql(query);
    }

    update() {
        if (this.platform.is('android')) {
            this.openUrlApp(`market://details?id=${this.package}`);
        }
        else if (this.platform.is('ios')) {
            this.openUrlApp(`itms-apps://itunes.apple.com/app/${this.idApple}`);
        }
    }

    getBible() {
        let version = 'pt_acf';
        return this.http.get<any>(`../assets/bible/${version}.json`);
    }

    async error(data) {
        const alert = await this.alertController.create({
          header: 'Erro',
          message: data,
          buttons: ['OK']
        });
    
        await alert.present();
    }
}
