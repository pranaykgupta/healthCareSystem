const Covid19_blockchain = artifacts.require('./Covid19_blockchain.sol');
contract('Covid19_blockchain', () => {
    let instance = null;
    before(async () => {
        instance = await Covid19_blockchain.deployed();
    });
    it('deploys successfully', async () => {
        const address = await instance.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    });
    it('Should create a new state', async () => {
        await instance.New_state('Bihar', 12, 15, 1, 2);
        const state = await instance.Search_statename('Bihar');
        assert(state[1].toNumber() === 0);
        assert(state[3] === 'Bihar');
        assert(state[5].toNumber() === 12);
        assert(state[7].toNumber() === 15);
        assert(state[9].toNumber() === 1);
        assert(state[11].toNumber() === 2);
    });

    it('Should not search a non-existing state', async () => {
        try {
            const sate = await instance.Search_statename('Punjab');
        } catch (e) {
            assert(e.message.includes('This state does not exist in blockchain!'));
            return;
        }
        assert(false);
    });

    it('Should update a  state', async () => {
        await instance.Update_state('Bihar', 17, 25, 7, 3);
        const state = await instance.Search_statename('Bihar');
        assert(state[1].toNumber() === 0);
        assert(state[3] === 'Bihar');
        assert(state[5].toNumber() === 17);
        assert(state[7].toNumber() === 25);
        assert(state[9].toNumber() === 7);
        assert(state[11].toNumber() === 3);
    });
    it('Should not update a non-existing state', async () => {
        try {
            await instance.Update_state('Punjab', 17, 25, 7, 3);
        } catch (e) {
            assert(e.message.includes('This state does not exist in blockchain!'));
            return;
        }
        assert(false);
    });
    it('Should not create an existing state', async () => {
        try {
            await instance.New_state('Bihar', 12, 15, 1, 2);
        } catch (e) {
            assert(e.message.includes('This state already exist in blockchain!'));
            return;
        }
        assert(false);
    });
    it('Should destoy a existing state', async () => {
        await instance.Delete_state('Bihar');
        try {
            await instance.Search_statename('Bihar');
        } catch (e) {
            assert(e.message.includes('This state does not exist in blockchain!'));
            return;
        }
        assert(false);
    });
    it('Should not destoy a non existing state', async () => {
        try {
            await instance.Delete_state('Punjab');
        } catch (e) {
            assert(e.message.includes('This state does not exist in blockchain!'));
            return;
        }
        assert(false);
    });
});

   
 
