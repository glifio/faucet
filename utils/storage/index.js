export const getVerification = () => {
  const verification = localStorage.getItem('verification-cid')
  if (!verification) return { cid: '', address: '' }
  return JSON.parse(verification)
}

export const setVerification = (msgCid, filecoinAddress) => {
  const item = { cid: msgCid, address: filecoinAddress }
  if (!getVerification().cid)
    localStorage.setItem('verification-cid', JSON.stringify(item))
}

export const removeVerificationCid = () => {
  localStorage.removeItem('verification-cid')
}
