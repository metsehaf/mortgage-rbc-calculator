import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculationSummaryComponent } from './pages/calculation-summary/calculation-summary.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { PaymentPlanComponent } from './pages/payment-plan/payment-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PaymentPlanComponent,
    FooterComponent,
    NavigationComponent,
    CalculationSummaryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
