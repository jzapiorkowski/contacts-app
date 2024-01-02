import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  SortDirection,
  SortTypeField,
} from '../../../services/contacts-filterer.service';

interface ContactsFilterForm {
  search: FormControl<string | null>;
  sortTypeField: FormControl<SortTypeField | null>;
  sortDirection: FormControl<SortDirection | null>;
  onlyFamily: FormControl<boolean | null>;
}

@Component({
  selector: 'app-contacts-filter-panel',
  templateUrl: './contacts-filter-panel.component.html',
  styleUrls: ['./contacts-filter-panel.component.scss'],
})
export class ContactsFilterPanelComponent {
  public filterPanelForm: FormGroup<ContactsFilterForm> =
    new FormGroup<ContactsFilterForm>({
      search: new FormControl<string | null>(null),
      sortTypeField: new FormControl<SortTypeField>(SortTypeField.MODIFIED_AT),
      sortDirection: new FormControl<SortDirection>(SortDirection.DESC),
      onlyFamily: new FormControl<boolean>(false),
    });

  @Output() public filteringOptions: EventEmitter<ContactsFilteringOptions> =
    new EventEmitter<ContactsFilteringOptions>();

  public sortTypeFieldOptions: SortTypeField[] = [
    SortTypeField.LAST_NAME,
    SortTypeField.PHONE_NUMBER,
    SortTypeField.MODIFIED_AT,
  ];

  public sortDirectionOptions: SortDirection[] = [
    SortDirection.DESC,
    SortDirection.ASC,
  ];

  public submitForm(): void {
    if (this.filterPanelForm.invalid) {
      return;
    }

    const filteringOptions: ContactsFilteringOptions = {
      search: this.filterPanelForm.value.search!,
      sortTypeField: this.filterPanelForm.value.sortTypeField,
      sortDirection: this.filterPanelForm.value.sortDirection,
      onlyFamily: this.filterPanelForm.value.onlyFamily || false,
    };

    this.filteringOptions.emit(filteringOptions);
  }
}
