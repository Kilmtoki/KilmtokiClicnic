# python -m pip install git+https://github.com/huggingface/transformers.git

# pip install  sentencepiece
# pip install protobuf
from huggingface_hub import login
login("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")

from transformers import AutoProcessor, SeamlessM4Tv2Model

# Load the processor and model
processor = AutoProcessor.from_pretrained("facebook/seamless-m4t-v2-large")
model = SeamlessM4Tv2Model.from_pretrained("facebook/seamless-m4t-v2-large")