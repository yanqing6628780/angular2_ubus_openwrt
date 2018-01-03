import { Injectable } from '@angular/core';



@Injectable()
export class FnService {
    private loginSessKey = 'user'
    setUserSess(data: object) {
        window.sessionStorage.setItem(this.loginSessKey, JSON.stringify(data))
    }
    getUserSess() {
        return JSON.parse(window.sessionStorage.getItem(this.loginSessKey))
    }
    clearUserSess() {
        window.sessionStorage.removeItem(this.loginSessKey)
    }
    parseWifiCfg = (cfg) => {
        let wireless_devices = []
        for(let key in cfg) {
            let item = cfg[key]
            if (item.device) {
                wireless_devices.push(item.device)
            }
        }
        if (!wireless_devices.length) {
            console.warn('处理wireless配置数据失败。没有找到wireless设备驱动名称', cfg);
            return undefined
        }
        let wireless = {};
        let isDisabled = '1';
        for (let key in cfg) {
            let item = cfg[key];
            let _key = item['.name'];
            if (wireless_devices.indexOf(_key) !== -1) {
                if (wireless[_key] == null) {
                    wireless[_key] = {};
                }
                wireless[_key] = Object.assign(wireless[_key], item);
                try {
                    if (wireless[_key].channel === 'auto') {
                        wireless[_key].channel = "0";
                    }
                } catch (error) {
                    wireless[_key].channel = "0";
                }
            } else {
                if (item.mode === 'ap' && item['.type'] === 'wifi-iface') {
                    let name;
                    if (wireless[name = item.device] == null) {
                        wireless[name] = {};
                    }
                    wireless[item.device]['cfg_name'] = item['.name'];
                    wireless[item.device] = Object.assign(wireless[item.device], item);
                }
                if (isDisabled !== '0') {
                    isDisabled = item.disabled != null ? item.disabled : item.disabled = '0';
                }
            }
        }
        return [wireless, isDisabled];
  }
}
