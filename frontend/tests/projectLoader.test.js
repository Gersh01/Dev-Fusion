import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { 
    getProjects,
    getOwnedProjects,
    getJoinedProjects,
    getProjectById,
    getProfileProjects,
    updateTeamMember,
    userLeavingProject
} from '../src/pages/loaders/projectLoader';
import { apiDomain } from "../src/utils/utility";

describe("Test project loader", () => {
    let mock;

    const testProjectId = '123';
    const testResponseData = { data: 'something important maybe' };

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it('getProjectById should fetch correctly', async () => {
        mock.onGet(`${apiDomain}/api/project/${testProjectId}`).reply(200, testResponseData);

        const result = await getProjectById(testProjectId); 

        expect(result).toEqual(testResponseData);
    });
    
    //more to come!

})