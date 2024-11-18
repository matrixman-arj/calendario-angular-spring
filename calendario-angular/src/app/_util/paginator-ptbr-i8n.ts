/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {Injectable, Optional, SkipSelf} from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorIntlPtBr extends MatPaginatorIntl {


  /** A label for the page size selector. */
  override itemsPerPageLabel: string = 'Itens por página:';

  /** A label for the button that increments the current page. */
  override nextPageLabel: string = 'Avançar';

  /** A label for the button that decrements the current page. */
  override previousPageLabel: string = 'Voltar';

  /** A label for the button that moves to the first page. */
  override firstPageLabel: string = 'Primeira página';

  /** A label for the button that moves to the last page. */
  override lastPageLabel: string = 'Última página';

  /** A label for the range of items within the current page and the length of the whole list. */
  override getRangeLabel: (page: number, pageSize: number, length: number) => string = (
    page: number,
    pageSize: number,
    length: number,
  ) => {
    if (length == 0 || pageSize == 0) {
      return `0 of ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} – ${endIndex} de ${length}`;
  };
}

