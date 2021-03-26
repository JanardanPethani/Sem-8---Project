import React, { Fragment } from 'react'
import getStatus from '../../utils/getStatus'

const RequestInfo = ({ data }) => (
    <Fragment>
        <div className='p-6 m-4 max-w-xl mx-auto bg-white rounded-xl shadow-md'>
            <div className='flex p-3 m-1 '>
                <div className='w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center'>
                    From:
                </div>
                <div className='self-center text-left  ml-2'>{data.from}</div>
            </div>
            <hr />
            <div className='flex p-3 m-1 '>
                <div className='w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center'>
                    To:
                </div>
                <div className='self-center text-left ml-2'>{data.to}</div>
            </div>
        </div>
        <div className='p-6 m-4 max-w-xl mx-auto bg-white rounded-xl shadow-md '>
            <div className='flex p-3 m-1 '>
                <div className='w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center'>
                    Leaving At:
                </div>
                <div className='self-center text-left ml-2'>{data.departAt}</div>
            </div>
            <hr />
            <div className='flex p-3 m-1 '>
                <div className='w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center'>
                    Posted At:
                </div>
                <div className='self-center text-left ml-2'>{data.created_at}</div>
            </div>
        </div>
        <div className='p-6 m-4 max-w-xl mx-auto bg-white rounded-xl shadow-md '>
            <div className='flex p-3 m-1 '>
                <div className='w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center'>
                    Status:
                </div>
                <div className='self-center text-left ml-2'>{getStatus(data.departAt)}</div>
            </div>
        </div>
    </Fragment>
)

export default RequestInfo
