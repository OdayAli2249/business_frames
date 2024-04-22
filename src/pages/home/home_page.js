import React from 'react';
import './home_page.css';
import HomeHeader from '../../components/home/home_layout/home_header/home_header';
import ServiceProvidersComponent from '../../components/home/service_providers/service_providers_component';
import BranchesComponent from '../../components/home/branches/branches_component';
import MembersComponent from '../../components/home/members/members_component';
import RecourcesComponent from '../../components/home/resources/resources_component';
import SpaceComponent from '../../components/core/space_component';

function HomePage(props) {
  return (
    <div className='home-root'>
      <HomeHeader />
      <SpaceComponent height={'100px'} />
      <ServiceProvidersComponent />
      <SpaceComponent height={'100px'} />
      <BranchesComponent />
      <SpaceComponent height={'100px'} />
      <RecourcesComponent />
      <SpaceComponent height={'100px'} />
      <MembersComponent />
    </div>
  );
}

export default HomePage;