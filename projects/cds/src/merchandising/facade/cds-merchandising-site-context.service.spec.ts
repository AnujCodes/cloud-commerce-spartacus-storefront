import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaseSiteService, LanguageService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { MerchandisingSiteContext } from './../model/merchandising-site-context.model';
import { CdsMerchandisingSiteContextService } from './cds-merchandising-site-context.service';

class BaseSiteServiceStub {
  getActive(): Observable<string> {
    return of();
  }
}
class LanguageServiceStub {
  getActive(): Observable<string> {
    return of();
  }
}

describe('CdsMerchandisingSiteContextService', () => {
  let cdsMerchandisingSiteContextService: CdsMerchandisingSiteContextService;
  let baseSiteService: BaseSiteService;
  let languageService: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BaseSiteService,
          useClass: BaseSiteServiceStub,
        },
        {
          provide: LanguageService,
          useClass: LanguageServiceStub,
        },
      ],
    });
    cdsMerchandisingSiteContextService = TestBed.get(
      CdsMerchandisingSiteContextService as Type<
        CdsMerchandisingSiteContextService
      >
    );
    baseSiteService = TestBed.get(BaseSiteService as Type<BaseSiteService>);
    languageService = TestBed.get(LanguageService as Type<LanguageService>);
  });

  it('should be created', () => {
    expect(cdsMerchandisingSiteContextService).toBeTruthy();
  });
  it('should return a valid MerchandisingSiteContext object with the site and language set', () => {
    const site = 'electronics-spa';
    const language = 'en';

    const userContext: MerchandisingSiteContext = {
      site,
      language,
    };

    spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
    spyOn(languageService, 'getActive').and.returnValue(of(language));

    let merchandisingSiteContext: MerchandisingSiteContext;
    cdsMerchandisingSiteContextService
      .getSiteContext()
      .subscribe(siteContext => {
        merchandisingSiteContext = siteContext;
      })
      .unsubscribe();
    expect(merchandisingSiteContext).toEqual(userContext);
  });
});
