import { AfterContentInit, AfterViewInit, Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationModal } from "@components/modals/validation-modal/validation-modal";
import { EmployeeDetails } from '@core/models';
import { AuthService, EmployeeService } from '@core/services';
import { TranslatePipe } from '@ngx-translate/core';
import { Spinner } from "@components/animation/spinner/spinner";

@Component({
  selector: 'app-display-employee',
  imports: [ValidationModal, TranslatePipe, Spinner],
  templateUrl: './display-employee.html',
  styleUrl: './display-employee.scss',
})
export class DisplayEmployee implements OnInit {
    private readonly _router = inject(Router);
    private readonly _route = inject(ActivatedRoute);
    private readonly _employee = inject(EmployeeService);
    private readonly _auth = inject(AuthService);
    displaymodale: boolean=false;
    idEmployee: number=1;
    employeeView: EmployeeDetails|null=null;
    data: string[] = [];
    async  ngOnInit() {
        this._route.params.subscribe(params => {
            const id = params['id'] as number;
      this.idEmployee=id;
    });
    console.log("employé : ");
    try
    {
        this.employeeView = await this._employee.DisplayOtherEmployeeAccount(this.idEmployee);
        this.employeeView.user.password="***";
    }
    catch
    {
        this._router.navigate(["/", "error", "400"]);
    }       
    }

    onFireEmployee()
    {
        console.log("Employee fired!");
        
    }
    onValidate()
    {
        this.displaymodale=true;
    }
    
    //  La modale renvoit la valeur du choix de l'admin et ensuite on doit la cacher et être reconduit vers la page enployé classique ici.
    //  Elle renverra ailleurs pour d'autres valeurs.
    toConfirm(confirmation: boolean)
    {
        this.displaymodale=false;
        if (confirmation)
        {
            this._employee.FireEmployee(this.idEmployee);
            this._router.navigate(["/", "employee"]);
        }
        else
        {
            console.log("Annulation...");
            
        }
        //if (confirmation===null)
    }
}
