import csrf from 'csurf';
import { Express, Router, urlencoded } from 'express';
import {
  getHelpController,
  getHomeController,
  getManageOrganizationsController,
  getPersonalInformationsController,
  getResetPasswordController,
  postPersonalInformationsController,
} from '../controllers/main';
import { ejsLayoutMiddlewareFactory } from '../services/renderer';
import { checkUserSignInRequirementsMiddleware } from '../middlewares/user';
import { rateLimiterMiddleware } from '../middlewares/rate-limiter';

export const mainRouter = (app: Express) => {
  const mainRouter = Router();
  const csrfProtectionMiddleware = csrf();

  mainRouter.use((req, res, next) => {
    res.set('Pragma', 'no-cache');
    res.set('Cache-Control', 'no-cache, no-store');
    next();
  });

  mainRouter.use(urlencoded({ extended: false }));

  mainRouter.get(
    '/',
    ejsLayoutMiddlewareFactory(app, true),
    checkUserSignInRequirementsMiddleware,
    getHomeController
  );

  mainRouter.get(
    '/personal-information',
    ejsLayoutMiddlewareFactory(app, true),
    csrfProtectionMiddleware,
    checkUserSignInRequirementsMiddleware,
    getPersonalInformationsController
  );

  mainRouter.post(
    '/personal-information',
    ejsLayoutMiddlewareFactory(app, true),
    csrfProtectionMiddleware,
    rateLimiterMiddleware,
    checkUserSignInRequirementsMiddleware,
    postPersonalInformationsController
  );

  mainRouter.get(
    '/manage-organizations',
    ejsLayoutMiddlewareFactory(app, true),
    csrfProtectionMiddleware,
    checkUserSignInRequirementsMiddleware,
    getManageOrganizationsController
  );

  mainRouter.get(
    '/reset-password',
    ejsLayoutMiddlewareFactory(app, true),
    csrfProtectionMiddleware,
    checkUserSignInRequirementsMiddleware,
    getResetPasswordController
  );

  mainRouter.get(
    '/help',
    ejsLayoutMiddlewareFactory(app, true),
    csrfProtectionMiddleware,
    getHelpController
  );

  return mainRouter;
};

export default mainRouter;
