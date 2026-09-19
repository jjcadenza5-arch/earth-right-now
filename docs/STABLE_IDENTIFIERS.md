# Stable identifiers

Source IDs and place IDs are durable product identifiers. They participate in favorites, recent history, share hashes, deep links, player history and recovery deduplication.

Public catalog identifiers therefore:
- contain no surrounding whitespace;
- use lowercase stable characters: letters, digits, dot, underscore and hyphen;
- begin with a letter or digit;
- are compared case-insensitively for duplicate protection.

Display names remain fully multilingual and human-friendly; stable IDs are intentionally machine-oriented.

Identifier normalization does not merge different physical sources. URL/source identity checks and human verification remain separate safeguards.
