import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount}) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? <Spinner /> : 
    <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead"><i className="fas fa-user"/> Welcome { user && user.name}</p>
        {profile !== null ? 
        <Fragment>
            <DashboardActions/>
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div>
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus"></i>
                    {' '}Delete My Account
                </button>
            </div>
        </Fragment> : 
        <Fragment>
            <p>You have not yet set a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
        </Fragment>}
    </Fragment>
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    deleteAccount: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
