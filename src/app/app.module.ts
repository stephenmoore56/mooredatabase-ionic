import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {EducationPage} from '../pages/education/education';
import {CertificationsPage} from '../pages/certifications/certifications';
import {TrainingPage} from '../pages/training/training';
import {ContactPage} from '../pages/contact/contact';
import {ArchitecturePage} from '../pages/architecture/architecture';
import {SpeciesByMonthPage} from '../pages/species-by-month/species-by-month';
import {SpeciesForMonthPage} from '../pages/species-for-month/species-for-month';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        EducationPage,
        CertificationsPage,
        TrainingPage,
        ContactPage,
        ArchitecturePage,
        SpeciesByMonthPage,
        SpeciesForMonthPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        EducationPage,
        CertificationsPage,
        TrainingPage,
        ContactPage,
        ArchitecturePage,
        SpeciesByMonthPage,
        SpeciesForMonthPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
