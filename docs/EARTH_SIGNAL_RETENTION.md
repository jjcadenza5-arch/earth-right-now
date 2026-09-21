# Earth Signal retention contract

Earth Signals are temporary evidence, not a permanent content archive.

A structured signal expires 45 minutes after creation. At the expiry boundary it is eligible for deletion, not merely hidden from the interface. Invalid or unparseable age data fails closed and is treated as expired.

Future storage infrastructure must implement physical or provider-level deletion for expired signal records and temporary media. A retention record contains only the identifiers and timestamps needed to enforce deletion; it does not preserve precise contributor coordinates.

This module defines the deletion semantics only. It does not claim that a storage/deletion backend exists, so the activation gate's **expiryDeletion** capability remains false until that infrastructure is implemented and verified.
