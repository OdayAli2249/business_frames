import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RootLayout from '../components/layouts/root_layout/root_layout';
import HomePage from '../pages/home/home_page';
import GetStartedPage from '../pages/get_started/get_started_page';
import BranchesGetStartedPage from '../pages/branches/branches_get_started_page';
import BranchesHomePage from '../pages/branches/branches_home_page';
import MembersHomePage from '../pages/members/members_home_page';
import MembersWrapperComponent from '../components/members/layouts/members_wrapper_component';
import MembersGetStartedPage from '../pages/members/members_get_started_page';
import ResourcesGetStartedPage from '../pages/resources/resources_get_started_page';
import BranchesWrapperComponent from '../components/branches/layouts/branches_wrapper_component';
import MemberServiceProvidersPage from '../pages/members/member_service_providers_page';
import AllBranchMembersPage from '../pages/branches/all_branch_members_page';
import BranchPermissionGroupsPage from '../pages/branches/branch_permission_groups_page';
import CraeteBranchPermissionGroupPage from '../pages/branches/create_branch_permission_group_page';
import BranchProductsPage from '../pages/branches/branch_products_page';
import BranchPostsPage from '../pages/branches/branch_posts_page';
import BranchServicesPage from '../pages/branches/branch_services_page';
import ServiceProvidersHomePage from '../pages/service_providers/service_providers_home_page';
import ServiceProviderDetailsPage from '../pages/service_providers/service_provider_details_page';
import HiringRequestsPage from '../pages/service_providers/hiring_requests_page';
import FindMembersPage from '../pages/service_providers/find_members_page';
import ServiceProvidersGetStartedPage from '../pages/service_providers/service_providers_get_started_page';
import ServiceProvidersWrapperComponent from '../components/service_providers/layouts/service_providers_wrapper_component';
import MyServiceProvidersPage from '../pages/service_providers/my_service_providers_page';
import CraeteServiceProviderPage from '../pages/service_providers/create_service_provider_page';
import ServiceProvidersBranchesPage from '../pages/service_providers/service_provider_branches_page';
import ApplyForJobsPage from '../pages/service_providers/apply_for_jobs_page';
import UpdateMyProfilePage from '../pages/members/update_my_profile_page';
import UserAuthPage from '../pages/user/user_auth_page';
import ErrorComponent from '../components/core/state_components/error_component';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route path='/' element={<GetStartedPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/auth' element={<UserAuthPage />} />
            <Route path='/branches' element={<BranchesGetStartedPage />} />
            <Route path='/branches' element={<BranchesWrapperComponent />}>
                <Route path='branches-home/:id' element={<BranchesHomePage />} />
                <Route path='members-find/:id' element={<AllBranchMembersPage />} />
                <Route path='branch-permission-groups/:id' element={<BranchPermissionGroupsPage />} />
                <Route path='branch-permission-group-create/:id' element={<CraeteBranchPermissionGroupPage />} />
                <Route path='branch-products/:id' element={<BranchProductsPage />} />
                <Route path='branch-posts/:id' element={<BranchPostsPage />} />
                <Route path='branch-services/:id' element={<BranchServicesPage />} />
            </Route>
            <Route path='/members' element={<MembersGetStartedPage />} />
            <Route path='/members' element={<MembersWrapperComponent />}>
                <Route path='members-home/:id' element={<MembersHomePage />} />
                <Route path='member-service-providers/:id' element={<MemberServiceProvidersPage />} />
                <Route path='update/:id' element={<UpdateMyProfilePage />} />

            </Route>
            <Route path='/resources' element={<ResourcesGetStartedPage />} />
            <Route path='/service-providers' element={<ServiceProvidersGetStartedPage />} />
            <Route path='/service-providers' element={<ServiceProvidersWrapperComponent />}>
                <Route path='service-provider-create/:id' element={<CraeteServiceProviderPage />} />
                <Route path='service-providers-home/:id' element={<ServiceProvidersHomePage />} />
                <Route path='service-provider-details/:id' element={<ServiceProviderDetailsPage />} />
                <Route path='service-provider-branches/:id' element={<ServiceProvidersBranchesPage />} />
                <Route path='hiring-requests/:id' element={<HiringRequestsPage />} />
                <Route path='apply-for-jobs/:id' element={<ApplyForJobsPage />} />
                <Route path='members-find/:id' element={<FindMembersPage />} />
                <Route path='my-service-providers/:id' element={<MyServiceProvidersPage />} />
            </Route>
            <Route path='*' element={<ErrorComponent message={'404 Page not found'} retry={'hide'} />} />
        </Route>
    )
)

export default router;