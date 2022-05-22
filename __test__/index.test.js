import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import Home from '../pages/index';
import FilteredContentWrapper from '../components/FilteredContentWrapper';
import UnfilteredContentWrapper from '../components/UnfilteredContentWrapper';
import '@testing-library/jest-dom';
import { MainContent } from '../components/HomePageStyles';
import { server } from '../mocks/server';

let user;
beforeEach(() => {
  user = userEvent.setup();
});

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />);
  });

  it('renders the NoReportsContainer', () => {
    render(<Home />);
    const noReportsHeader = screen.getByRole('heading', { name: 'No reports' });
    expect(noReportsHeader).toBeInTheDocument();
  });

  it('renders dropdown content after clicking on select project', async () => {
    render(<Home />);

    const dropdownIcon = screen.getByRole('button', { name: 'arrow-down-logo' });
    await user.click(dropdownIcon);
    const dropdownContent = screen.getByRole('option', { name: 'All projects' });
    expect(dropdownContent).toBeInTheDocument();


  });


  it('date input changes when user changes the input', () => {
    render(<Home />)

    const dateField = screen.getAllByRole('textbox');

    dateField[0].value = '2021-01-01'
    fireEvent.change(dateField[0]);
    expect(dateField[0].value).toBe('2021-01-01');


    dateField[1].value = '2021-12-31';
    fireEvent.change(dateField[1]);
    expect(dateField[1].value).toBe('2021-12-31');




  })

  it('should not render the project-list initially', () => {
    render(<Home />);
    const projectList = screen.queryByTestId('project-list');
    expect(projectList).toBeNull();
  })

  // it('should render the project-list after clicking on select project', async () => {
  //   const { getByTestId } = render(<Home />);
  //   const dropdownIcon = screen.getByRole('button', { name: 'arrow-down-logo' });
  //   await user.click(dropdownIcon);

  //   const dropdownContent = screen.getByRole('option', { name: 'All projects' });
  //   await user.click(dropdownContent);







  //   const projectList = screen.getByTestId('project-list');
  //   expect(projectList).toBeInTheDocument();
  // })



})