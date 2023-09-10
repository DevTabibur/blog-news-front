import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { deleteSingleFAQ, getAllFAQ } from 'apis/faq.api';
import { Button } from '@mui/material';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const CustomizedAccordionData = ({ fq, handleDeleteFAQ }) => {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange =
        (panel) => (event, newExpanded) => {
            setExpanded(newExpanded ? panel : false);
        };

        function createMarkup(d) {
            return {__html: d};
          }



    return (
        <>

            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>{fq?.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {fq && <div dangerouslySetInnerHTML={createMarkup(fq?.description)}></div>}


                    </Typography>
                    <Button color='error' onClick={() => handleDeleteFAQ(fq?._id)}>DELETE</Button>
                </AccordionDetails>
            </Accordion>

        </>
    );
}


export default CustomizedAccordionData
