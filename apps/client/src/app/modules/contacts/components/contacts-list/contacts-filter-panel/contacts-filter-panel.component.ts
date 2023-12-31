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
  filterPanelForm = new FormGroup<ContactsFilterForm>({
    search: new FormControl<string | null>(null),
    sortTypeField: new FormControl<SortTypeField>(SortTypeField.ModifiedAt),
    sortDirection: new FormControl<SortDirection>(SortDirection.Desc),
    onlyFamily: new FormControl<boolean>(false),
  });

  @Output() filteringOptions = new EventEmitter<ContactsFilteringOptions>();

  sortTypeFieldOptions: SortTypeField[] = [
    SortTypeField.LastName,
    SortTypeField.PhoneNumber,
    SortTypeField.ModifiedAt,
  ];

  sortDirectionOptions: SortDirection[] = [
    SortDirection.Desc,
    SortDirection.Asc,
  ];

  submitForm() {
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
