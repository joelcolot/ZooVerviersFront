import { JsonPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-validation-modal',
  imports: [JsonPipe],
  templateUrl: './validation-modal.html',
  styleUrl: './validation-modal.scss',
})
export class ValidationModal {
    //  Essayer d'avoir une modale s'adaptant selon le nombre d'informations qu'elle reçoit.
    //  Elle reçoit un json ou un tableau et ensuite elle affiche le résumé de la donnée à supprimer.
    //idData = input<number>();
    data = input();
    confirmation = output<boolean>();
    //  output booléen pour savoir si validé ou non.

    onValidate()
    {
      this.confirmation.emit(true);
    }

    onCancel()
    {
      this.confirmation.emit(false);
    }
}
