import React, {useContext, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/authContext';
import {useHistory} from 'react-router-dom';

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  const [link, setLink] = useState('');

  const onKeyPress = async e => {
    if (e.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        });

        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <div className='container pt-4'>
      <div className="row">
        <div className="col-sm">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Link"
              type="text"
              id="link"
              name="link"
              value={link}
              onChange={e => setLink(e.target.value)}
              onKeyPress={onKeyPress}
            />
            <small id="emailHelp" className="form-text text-muted">Put your link and press Enter for short it!</small>
          </div>
        </div>
      </div>
    </div>
  )
};
