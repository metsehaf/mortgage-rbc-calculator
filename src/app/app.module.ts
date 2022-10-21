import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculationSummaryComponent } from './pages/calculation-summary/calculation-summary.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './pages/footer/footer.component';
import { MortgageSummaryComponent } from './pages/mortgage-summary/mortgage-summary.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { PaymentPlanComponent } from './pages/payment-plan/payment-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PaymentPlanComponent,
    MortgageSummaryComponent,
    FooterComponent,
    NavigationComponent,
    CalculationSummaryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
