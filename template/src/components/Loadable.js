import React from 'react';
import Loadable from 'react-loadable';

const Loading = ({ isLoading, error, pastDelay }) => {
  if(isLoading) {
    return <div>组件加载中...</div>;
  }else if(error) {
    return <div>组件加载错误：{error}</div>;
  }else {
    return null;
  }
}

export default loader => Loadable({
  loader,
  loading: Loading
})
