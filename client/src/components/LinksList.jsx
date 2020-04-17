import React from 'react';
import {Link} from 'react-router-dom';

export const LinksList = ({links}) => {
  if (!links.length) {
    return <p className='text-center pt-4'>No have links now</p>
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Original</th>
          <th scope="col">Short</th>
          <th scope="col">Open</th>
        </tr>
      </thead>
      <tbody>
        {links.map((link, index) => (
          <tr key={link._id}>
            <th>{index + 1}</th>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/detail/${link._id}`}>Open</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};
