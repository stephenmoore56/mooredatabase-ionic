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
import {SpeciesDetailPage} from '../pages/species-detail/species-detail';
import {SpeciesForLocationPage} from '../pages/species-for-location/species-for-location';
import {SpeciesByLocationPage} from '../pages/species-by-location/species-by-location';

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
        SpeciesForMonthPage,
        SpeciesDetailPage,
        SpeciesByLocationPage,
        SpeciesForLocationPage
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
        SpeciesForMonthPage,
        SpeciesDetailPage,
        SpeciesByLocationPage,
        SpeciesForLocationPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
