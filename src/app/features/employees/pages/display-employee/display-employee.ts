import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationModal } from "@components/modals/validation-modal/validation-modal";

@Component({
  selector: 'app-display-employee',
  imports: [ValidationModal],
  templateUrl: './display-employee.html',
  styleUrl: './display-employee.scss',
})
export class DisplayEmployee {
    private _router = inject(Router);
    displaymodale: boolean=false;
    data: string[] = ["id", "2","prénom", "Michaël", "nom", "jeckson"];
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
            console.log("Suppression...");
            this._router.navigate(["/", "employee"]);
        }
        else
        {
            console.log("Annulation...");
            
        }
        //if (confirmation===null)
    }
}
