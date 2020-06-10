import React from 'react'
import PropTypes from 'prop-types'

import { Menu, MenuItem } from '../Menu'
import Stepper from '../Stepper'
import Loading from '../LoaderGlyph'
import Glyph from '../Glyph'
import ErrorGlyph from '../Glyph/ErrorGlyph'
import { Title } from '../Typography'
import Box from '../Box'

const StepHeader = ({
  currentStep,
  glyphAcronym,
  Icon,
  loading,
  totalSteps,
  showStepper,
  title,
  error
}) => {
  return (
    <Menu
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      borderColor='silver'
      width='100%'
    >
      <Box display='flex' flexDirection='row' alignItems='center'>
        <MenuItem display='flex' justifyContent='space-between'>
          {error && <ErrorGlyph />}
          {loading && !error && <Loading />}
          {!loading && !error && <Glyph Icon={Icon} acronym={glyphAcronym} />}
        </MenuItem>
        <Box width={2} />
        {title && <Title>{title}</Title>}
      </Box>
      {showStepper && (
        <MenuItem>
          <Stepper
            textColor={error ? 'status.fail.foreground' : 'core.nearblack'}
            completedDotColor={
              error ? 'status.fail.foreground' : 'status.success.background'
            }
            incompletedDotColor='status.inactive'
            step={currentStep}
            totalSteps={totalSteps}
            ml={4}
            my={0}
          />
        </MenuItem>
      )}
    </Menu>
  )
}

StepHeader.propTypes = {
  loading: PropTypes.bool,
  currentStep: PropTypes.number.isRequired,
  glyphAcronym: PropTypes.string,
  Icon: PropTypes.object,
  totalSteps: PropTypes.number.isRequired,
  error: PropTypes.bool,
  showStepper: PropTypes.bool
}

StepHeader.defaultProps = {
  loading: false,
  error: false,
  glyphAcronym: '',
  showStepper: true
}

export default StepHeader
