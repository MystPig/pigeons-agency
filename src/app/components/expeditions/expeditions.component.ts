import { Component, OnInit } from '@angular/core';
import expeditionsList from '../../lists/expeditionsList';
import { ExpeditionsService, ExpeditionPageDataAPIReturn } from 'src/app/services/expeditions.service';
import { ExpeditionInfo } from 'src/app/interfaces/expedition-info';
import Expedition from 'src/app/interfaces/expedition';

@Component({
    selector: 'app-expeditions',
    templateUrl: './expeditions.component.html',
    styleUrls: ['./expeditions.component.less']
})
export class ExpeditionsComponent implements OnInit {

    pageLoading: boolean = true;
    filteredExpeditionsInfo: ExpeditionInfo[] = [];
    expeditionsInfo: ExpeditionInfo[] = [];
    myExpeditions: Expedition[];

    constructor(public expeditionsService: ExpeditionsService) { }

    ngOnInit() {
        this.expeditionsInfo = expeditionsList;
        this.filteredExpeditionsInfo = this.expeditionsInfo;
        this.getExpeditionsData();
    }

    async getExpeditionsData() {
        this.myExpeditions = (await this.expeditionsService.getExpeditionsData()).data;
        this.pageLoading = false;
    }

    async launchExpedition(id: number) {
        await this.expeditionsService.launchExpedition({
            expeditiontype: id
        });
        await this.getExpeditionsData();

    }

    getExpeditionName(id: number): string {
        return this.expeditionsInfo[id].name;
    }
    getRemainingTime(start: string, duration: number):number {
        const t = Math.floor((Number.parseInt(start)+duration-Date.now())/1000);
        return (t);
    }
}
