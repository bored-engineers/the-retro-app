import exportBoard from './export-board.service';
import { getBoardData } from './board.service';

jest.mock('jspdf', () => jest.fn().mockImplementation(() => ({
    internal: { pageSize: { getWidth: jest.fn(), getHeight: jest.fn() } },
    addImage: jest.fn(),
    line: jest.fn(),
    autoTable: jest.fn(),
    getNumberOfPages: jest.fn(),
    save: jest.fn(),
    lastAutoTable: { finalY: 0, }
})));
jest.mock('./board.service');
describe('Export Board', () => {
    it('should download pdf', () => {
        (getBoardData as jest.Mock).mockReturnValue({ cards: [] });
        exportBoard('123');
        expect(getBoardData).toHaveBeenCalledWith('123');
    })
});