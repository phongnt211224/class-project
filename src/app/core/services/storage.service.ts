import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
class StorageData {
  params?: any;
}

export class StorageService {
  public static data: StorageData;
  private static instanceName = '_AppStorage';
  private static storage = localStorage;

  /**
   * init
   */
  public static init(): void {
  }

  /**
   * isExprited
   */
  public static isExprited(): boolean {
    return false;
  }

  /**
   * clear
   */
  public static clear(): void {
    this.storage.removeItem(this.instanceName);
  }

  /**
   * storedData
   */
  public static storedData(): any {
    const storedData = this.storage.getItem(this.instanceName);
    if (this.isNullOrEmpty(storedData)) {
      return null;
    }
    return storedData;
  }

  public static isNullOrEmpty(str: any): boolean {
    return !str || (str + '').trim() === '';
  }

  /**
   * get
   */
  public static get(key: string): any {
    if (this.isExprited()) {
      return null;
    }
    const storedData = this.storedData();
    if (storedData == null) {
      return null;
    }
    return storedData[key];
  }

  /**
   * get
   */
  public static set(key: string, val: any): any {
    let storedData = this.storedData();
    if (storedData == null) {
      storedData = new StorageData();
    }
    storedData[key] = val;
    this.storage.setItem(this.instanceName, storedData);
  }



}
