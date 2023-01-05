import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import searchRoutes from './searchRoutes';
import regionRoutes from './regionRoutes';
import areaRoutes from './areaRoutes';
import localitiesRoutes from './localitiesRoutes';
import organizationRoutes from './organizationRoutes';
import archiveRoutes from './archiveRoutes';
import notaryRoutes from './notaryRoutes';

export default app => {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/search', searchRoutes);
  app.use('/api/regions', regionRoutes);
  app.use('/api/areas', areaRoutes);
  app.use('/api/localities', localitiesRoutes);
  app.use('/api/organizations', organizationRoutes);
  app.use('/api/archives', archiveRoutes);
  app.use('/api/notaries', notaryRoutes);
};
