import { Observable } from 'rxjs';
import { Budget } from '../../../model/budget.model';
import { BudgetSearchConfig } from '../../model/search-config';

export abstract class BudgetAdapter {
  /**
   * Abstract method used to load budgetManagment's details data.
   * Budget's data can be loaded from alternative sources, as long as the structure
   * converts to the `Budget`.
   *
   * @param userId The `userId` for given budgetManagment
   * @param budgetCode The `budgetCode` for given budgetManagment
   */
  abstract load(userId: string, budgetCode: string): Observable<Budget>;

  abstract loadMany(
    userId: string,
    params?: BudgetSearchConfig
  ): Observable<Budget[]>;

  abstract create(userId: string, budget: Budget): Observable<Budget>;

  abstract update(userId: string, budget: Budget): Observable<Budget>;
}
