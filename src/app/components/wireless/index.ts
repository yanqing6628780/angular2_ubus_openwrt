import { wirelessEncryption } from './../wireless_encryption';
import { SamPasswordEyeComponent } from './../password_eye/index';
import { UciService } from './../../services/uci.service';
import { FnService } from './../../services/fn.service';
import { SessionService } from './../../services/session.service';
import { Component, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
    styleUrls: ['./index.css'],
    selector: 'wireless',
    templateUrl: './index.html'
})
export class wirelessComponent implements OnInit {
    @Output() wirelessCfg: object
    public wirelessDevices: string[]
    private wirelessEncryption = wirelessEncryption
    private orignWirelessCfg: object
    constructor(private ucis: UciService, private Fn: FnService) {}
    ngOnInit() {
        this.ucis.show('wireless').subscribe((data:any) => {
            this.orignWirelessCfg = data.values
            let rs = this.Fn.parseWifiCfg(data.values)
            if (rs.length) {
                this.wirelessCfg = rs[0]
                this.wirelessDevices = Object.keys(rs[0])
            }
        })
    }
    submit() {
        for(let device in this.wirelessCfg) {
            let cfg = this.wirelessCfg[device]
            this.ucis.set('wireless', cfg.cfg_name, {
                ssid: cfg.ssid,
                key: cfg.key,
                encryption: cfg.encryption,
            }).subscribe(console.log)
        }
    }
}
