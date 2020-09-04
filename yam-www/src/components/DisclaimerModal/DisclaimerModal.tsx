import React, { useCallback, useState, useMemo } from 'react'

import Button from '../Button'
import CardIcon from '../CardIcon'
import Modal, { ModalProps } from '..//Modal'
import ModalActions from '..//ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'

interface DisclaimerModal extends ModalProps {
  onConfirm: () => void
}

const DisclaimerModal: React.FC<DisclaimerModal> = ({ onConfirm, onDismiss }) => {

  const [step, setStep] = useState('disclaimer')

  const handleConfirm = useCallback(() => {
    onConfirm()
    onDismiss()
  }, [onConfirm, onDismiss])

  const modalContent = useMemo(() => {
    if (step === 'disclaimer') {
      return (
        <div>
          <p>Audits: None.</p>
          <p>We STRONGLY urge caution to anyone who chooses to engage with these contracts.</p>
        </div>
      )
    } else {
      return (
        <div>
          <p>Attention Uniswap LPs</p>
          <p>Providing liquidity for Uniswap pools is dangerous</p>
          <p>You will LOSE your share of rebases</p>
        </div>
      )
    }
  }, [step])

  const button = useMemo(() => {
    if (step === 'disclaimer') {
      return (
        <Button text="Next" variant="secondary" onClick={() => setStep('uniswap')} />
      )
    } else {
      return (
        <Button text="I understand" onClick={handleConfirm} />
      )
    }
  }, [setStep, step, handleConfirm])

  return (
    <Modal>
      <ModalTitle text={`Warning`} />
      <CardIcon>⚠️</CardIcon>
      <ModalContent>
        {modalContent}
      </ModalContent>
      <ModalActions>
        {button}
      </ModalActions>
    </Modal>
  )
}


export default DisclaimerModal