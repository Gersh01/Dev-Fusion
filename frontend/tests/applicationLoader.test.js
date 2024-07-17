import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { 
    getApplications, 
    applicationApply, 
    applicationAccept, 
    applicationDeny 
} from '../src/pages/loaders/applicationLoader';
import { apiDomain } from "../src/utils/utility";

describe('test applicationLoader', () => {
    let mock;

    const testProjectId = '123';
    const testResponseData = { data: 'some data' };

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it('getApplications should fetch data successfully', async () => {        
        mock.onGet(`${apiDomain}/api/inbox/${testProjectId}`).reply(200, testResponseData);
        
        const result = await getApplications(testProjectId);

        expect(result).toEqual(testResponseData);
    });

    it('getApplications should handle error', async () => {
        mock.onGet(`${apiDomain}/api/inbox/${testProjectId}`).reply(500);

        const consoleSpy = vi.spyOn(console, 'log');
        const result = await getApplications(testProjectId);
        
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error'));
        expect(result).toBeNull();
        
        consoleSpy.mockRestore();
    });

    it('applicationApply should post data successfully', async () => {
        const payload = { key: 'value' };

        mock.onPost(`${apiDomain}/api/inbox/apply`, payload).reply(200);

        await expect(applicationApply(payload)).resolves.toBeUndefined();
    });

    it('applicationAccept should post data successfully', async () => {
        const application = { key: 'value' };

        mock.onPost(`${apiDomain}/api/inbox/accept_member`, application).reply(200);

        await expect(applicationAccept(application)).resolves.toBeUndefined();
    });

    it('applicationAccept should handle error', async () => {
        const application = { key: 'value' };

        mock.onPost(`${apiDomain}/api/inbox/accept_member`, application).reply(500);

        const consoleSpy = vi.spyOn(console, 'log');
        await applicationAccept(application);
        
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error'));
        
        consoleSpy.mockRestore();
    });

    it('applicationDeny should post data successfully', async () => {
        const application = { key: 'value' };

        mock.onPost(`${apiDomain}/api/inbox/reject_member`, application).reply(200);

        await expect(applicationDeny(application)).resolves.toBeUndefined();
    });

    it('applicationDeny should handle error', async () => {
        const application = { key: 'value' };

        mock.onPost(`${apiDomain}/api/inbox/reject_member`, application).reply(500);

        const consoleSpy = vi.spyOn(console, 'log');
        await applicationDeny(application);
        
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error'));
        
        consoleSpy.mockRestore();
    });
});