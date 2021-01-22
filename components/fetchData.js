import React from 'react';
import isoFetch from 'isomorphic-fetch';

class FetchData extends React.PureComponent {

    fetchConfig={
        URL: 'https://api.spacexdata.com/v4/',
        method: 'get',
        redirect: 'follow',
        headers: {
            "Accept": "application/json",
        },
        launch_year: 2018
    };

    state = {
        dataReady: false, // готовы ли данные
        combinedProps: null, // исходные пропсы, переданные HOC-у, плюс пропс propName с загруженными данными
    };

    result;

    fetchError = (errorMessage) => {
        console.error(errorMessage);
    };

    fetchSuccess = (loadedData) => {
        return loadedData;
    };

    loadDataRocket = async () => { //получение списка ракет
        try {
            let response=await isoFetch(this.fetchConfig.URL + 'rockets', this.fetchConfig);
            if (!response.ok) {
                throw new Error("fetch error " + response.status);
            }
            let data=await response.json();
            this.fetchSuccess(data);
            return data;
        }
        catch (error) {
            this.fetchError(error.message);
        }
    };

    loadDataCompany = async () => { //получение информации о компании
        try {
            let response=await isoFetch(this.fetchConfig.URL + 'company', this.fetchConfig);
            if (!response.ok) {
                throw new Error("fetch error " + response.status);
            }
            let data=await response.json();
            this.fetchSuccess(data);
            return data;
        }
        catch (error) {
            this.fetchError(error.message);
        }
    };

    loadDataLaunches = async () => { //получение информации о стартах
        try {
            let response=await isoFetch(this.fetchConfig.URL + 'launches/past', this.fetchConfig);
            if (!response.ok) {
                throw new Error("fetch error " + response.status);
            }
            let data=await response.json();
            this.fetchSuccess(data);
            return data;
        }
        catch (error) {
            this.fetchError(error.message);
        }
    };

    render() {
        //console.log(this.state);
        if ( !this.state.dataReady )
        return <div>загрузка данных...</div>;

        return  this.result;
    }

  

}

export default FetchData;