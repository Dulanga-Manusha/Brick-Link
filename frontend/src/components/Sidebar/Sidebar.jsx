import React from 'react';
import './Sidebar.css';
import { useParams ,Link } from 'react-router-dom';

const Sidebar = ({ pageType }) => {
    const { id } = useParams();
  
    
    console.log('Rendering Sidebar with pageType:', pageType);

    const links = {
        contractor: [
            { text: 'Find Contracts', href: `/contractor/${id}` , state: {  userId:id, userRole:'contractor' }},
            { text: 'Find Workers', href: `/contractor/${id}/my-contracts` , state: {  userId:id, userRole:'contractor' }},
            { text: 'Worker Requests', href: `/contractor/${id}/requests` , state: {  userId:id, userRole:'contractor' }},
            { text: 'Current Projects', href: `/contractor/${id}/current-projects` , state: {  userId:id, userRole:'contractor' }}
        ],
        worker: [
            { text: 'Find Works', href: `/worker/${id}`  , state: {  userId:id, userRole:'worker' }},
            { text: 'My Works', href: `/applied-works/${id}`,  state: {  userId:id, userRole:'worker' } },
            { text: 'Current Works', href: `/worker/${id}/current-works`,  state: {  userId:id, userRole:'worker' }}
        ],
        client: [
            { text: 'My Contracts', href: `/client/${id}`, state: {  userId:id, userRole:'client' } },
            { text: 'Add New contract', href: `/addContract/${id}` , state: { userId: id, userRole: 'client' }},
            { text: 'Ongoing Contracts', href: `/ongoingContracts/${id}` , state: { userId: id, userRole: 'client' }}
        ]
    };

    return (
        <div className={`sidebar sidebar-${pageType}`}>
            <ul>
                {links[pageType]?.map((link, index) => (
                    <li key={index}>
                        <Link to={link.href} state={link.state}>{link.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
